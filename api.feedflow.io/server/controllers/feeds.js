import 'babel-polyfill'
import Feed from '../models/feeds'
import Tag from '../models/tags'

class FeedController {

  /* eslint-disable no-param-reassign*/

  /**
   * Get all feeds
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    var response = FeedController.fetchFeeds(ctx.params, ctx.query)
    ctx.body = await response
  }

  /**
   * Add a feed
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      const feed = await new Feed(ctx.request.body).save()
      ctx.body = feed
    } catch (err) {
      ctx.throw(422)
    }
  }

  /**
   * Update a feed
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const feed = await Feed.findByIdAndUpdate(ctx.params.id, ctx.request.body)
      if (!feed) {
        ctx.throw(404)
      }
      ctx.body = feed
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /**
   * Delete a feed
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const feed = await Feed.findByIdAndRemove(ctx.params.id)
      if (!feed) {
        ctx.throw(404)
      }
      ctx.body = feed
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /* eslint-enable no-param-reassign */

  static async fetchFeeds(urlParams, queryParams) {
      var paramTags = [];
      let paramTagIds = [];
      if (queryParams && queryParams.tags) {
          paramTags = JSON.parse(queryParams.tags);
          paramTagIds = paramTags.map(function(a) {return a._id;});
      }

      let selector = {};
      var sort = {created: -1};

      if (urlParams.type == 'podcast') {
          selector = {'media_type': 'podcast'};
      }

      if (urlParams.sort == 'clicks') {
          sort = {clicks: -1};
      }

      var feeds = await Feed.find(selector).sort(sort).select({'excerpt': 0, 'content': 0}).lean().exec();

      var newFeeds = [];

      await Promise.all(feeds.map(async (feed) => {
        if (feed.tagIds) {
            let hasTag = 0;
            if (paramTags.length) {
                hasTag = paramTagIds.some(function (v) {
                    return feed.tagIds.indexOf(v) >= 0;
                });
            }

            if (!paramTags.length || (paramTags.length && hasTag)) {
                var tags = await Tag.find({_id: {$in: feed.tagIds}}).lean().exec()
                feed.tags = tags;
                newFeeds.push(feed);
            }
        }
      }));

      return {'message':{'zests':newFeeds, 'meta': {}}};
  }

}

export default new FeedController()

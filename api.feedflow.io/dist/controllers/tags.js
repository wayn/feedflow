import 'babel-polyfill';
import Tag from '../models/tags';

class TagController {

  /* eslint-disable no-param-reassign*/

  /**
   * Get all cities
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await Tag.find();
  }

  /**
   * Add a city
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      const tag = await new Tag(ctx.request.body).save();
      ctx.body = tag;
    } catch (err) {
      ctx.throw(422);
    }
  }

  /**
   * Update a city
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const tag = await Tag.findByIdAndUpdate(ctx.params.id, ctx.request.body);
      if (!tag) {
        ctx.throw(404);
      }
      ctx.body = tag;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Delete a city
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const tag = await Tag.findByIdAndRemove(ctx.params.id);
      if (!tag) {
        ctx.throw(404);
      }
      ctx.body = tag;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /* eslint-enable no-param-reassign */

}

export default new TagController();
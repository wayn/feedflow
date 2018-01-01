import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const feedSchema = new Schema({
  created: Date,
  clicks: Number,
  image: String,
  tagIds: [Schema.Types.ObjectId],
  media_type: String,
  description: String,
  header: String,
  domain: String,
  source: String,
  favicon: String,
  excerpt: String,
  content: String
});

export default mongoose.model('Feed', feedSchema);
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const tagSchema = new Schema({
  created: Date,
  name: String,
  number_of_zests: Number,
  is_deleted: Boolean
});

export default mongoose.model('Tag', tagSchema);
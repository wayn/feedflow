import mongoose from 'mongoose'

const Schema = mongoose.Schema

mongoose.Promise = global.Promise;

const tagSchema = new Schema({
  _id: String,
  created: { type: Date, default: Date.now },
  name: String,
  number_of_zests: Number,
  is_deleted: { type: Boolean, default: 0 },
})

export default mongoose.model('Tag', tagSchema)

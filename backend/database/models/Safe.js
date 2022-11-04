const mongoose = require('mongoose');

const safeSchema = mongoose.Schema(
	{
		ownerId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'user',
		},
		safeName: {
			type: String,
			required: [true, 'Please add safe name'],
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		relPath: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('safe', safeSchema, 'safes');

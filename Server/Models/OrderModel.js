import mongoose from 'mongoose';

const productReviewSchema = mongoose.Schema(
    {
        userName: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        orderItems: [
            {
                name: { type: String, required: true },
                color: { type: String, required: true },
                qty: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                productReview: [productReviewSchema],
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
            },
        ],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: false },
            country: { type: String, required: true },
        },
        payment: {
            signature: { type: String },
            moneyPay: { type: String },
            timePay: { type: String },
            partner: { type: String },
            message: { type: String },
            payUrl: { type: String },
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['payment-with-cash', 'payment-with-online'],
            default: 'payment-with-cash',
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        discountPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        waitConfirmation: {
            type: Boolean,
            required: true,
            default: false,
        },
        waitConfirmationAt: {
            type: Date,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        completeUser: {
            type: Boolean,
            required: true,
            default: false,
        },
        completeUserAt: {
            type: Date,
        },
        completeAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        completeAdminAt: {
            type: Date,
        },
        cancel: {
            type: Number,
            default: 0,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
        phone: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        receive: {
            type: Boolean,
            required: true,
            default: false,
        },

        receiveAt: {
            type: Date,
        },
        errorPaid: {
            type: Boolean,
            required: true,
            default: false,
        },

        errorPaidAt: {
            type: Date,
        },
        isGuarantee: {
            type: Boolean,
            required: true,
            default: false,
        },

        isGuaranteeAt: {
            type: Date,
        },
        content: { type: String },
        noteGuarantee: { type: String },
        userNv: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', orderSchema);

export default Order;

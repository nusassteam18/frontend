export let constants = {
    API_GATEWAY_URL: process.env.VUE_APP_API_GATEWAY_URL || 'http://localhost:8080',

    // For Order status update
    SAME_ORDER_STATUS: 1,
    SUCCESS: 0,
    SUCCESS_BUT_SEND_EMAIL_FAILED: -1,
    ORDER_NOT_FOUND: -2,
    ORDER_STATUS_UPDATE_FAILED: -3,
}
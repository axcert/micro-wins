// Add this action:
updateNotificationToken(state, action) {
  state.notificationToken = action.payload;
},
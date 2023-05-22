import { createSlice } from '@reduxjs/toolkit';

const initialStateChat = {
  receiver: {
    memberId: -1,
    imageUrl: '',
    userName: ''
  },
  isChat: false
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: { ...initialStateChat },
  reducers: {
    startChat(state, action) {
      return { receiver: action.payload, isChat: true };
    },
    stopChat() {
      return { ...initialStateChat };
    }
  }
});

export const { startChat, stopChat } = chatSlice.actions;
export default chatSlice.reducer;

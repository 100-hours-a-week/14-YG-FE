import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import PostDetail from "./pages/postDetail/PostDetail";
import Mypage from "./pages/mypage/Mypage";
import Signup from "./pages/signup/Signup";
import SignupInfo from "./pages/signupInfo/SignupInfo";
import WritePost from "./pages/writePost/WritePost";
import PostList from "./pages/postList/PostList";
import ChatList from "./pages/chatList/ChatList";
import { Chat } from "./components/chatList/chatCard/ChatCard.styled";
import EditPost from "./pages/editPost/EditPost";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products/:postId" element={<PostDetail />} />
        <Route path="/products" element={<PostList />} />
        <Route path="/products/category/:category" element={<PostList />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupInfo" element={<SignupInfo />} />
        <Route path="/writePost" element={<WritePost />} />
        <Route path="/editPost/:postId" element={<EditPost />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat/id" element={<Chat />} />
      </Routes>
    </>
  );
};

export default AppRouter;

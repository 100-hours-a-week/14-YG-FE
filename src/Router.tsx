import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import PostDetail from "./pages/postDetail/PostDetail";
import Mypage from "./pages/mypage/Mypage";
import Signup from "./pages/signup/Signup";
import SignupInfo from "./pages/signupInfo/SignupInfo";
import WritePost from "./pages/writePost/WritePost";
import PostList from "./pages/postList/PostList";
import ChatList from "./pages/chatList/ChatList";
import EditPost from "./pages/editPost/EditPost";
import ChatRoom from "./pages/chatRoom/ChatRoom";
import EditMyInfo from "./pages/editMyInfo/EditMyInfo";
import EditPassword from "./pages/editPassword/EditPassword";
import KakaoCallback from "./pages/KakaoCallback";
import EditAccount from "./pages/editAccount/EditAccount";
import Notification from "./pages/notification/Notification";

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
        <Route path="/editProfile" element={<EditMyInfo />} />
        <Route path="/editProfile/password" element={<EditPassword />} />
        <Route path="/editProfile/account" element={<EditAccount />} />
        <Route path="/writePost" element={<WritePost />} />
        <Route path="/editPost/:postId" element={<EditPost />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat/:chatRoomId" element={<ChatRoom />} />
        <Route path="/kakao/callback" element={<KakaoCallback />} />
        <Route path="/notification" element={<Notification />} />
      </Routes>
    </>
  );
};

export default AppRouter;

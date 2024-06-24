import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import RtlLayout from "layouts/rtl";
// import AdminLayout from "layouts/admin";
// import AuthLayout from "layouts/auth";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "views/auth/SignIn";
import LayoutAuth from "layouts/auth";
import LayoutAdmin from "layouts/admin";
import RouterApp from "router";
import {jwtDecode} from 'jwt-decode';
import { clearAuth } from './redux/authSlice';
const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  var timeToken = "";
  
  useEffect(() => {
    if(token){
      const decodedToken = jwtDecode(token);
      timeToken = decodedToken.exp * 1000;
      const checkTokenExpiration = () => {
        const currentTime = Date.now();
        if (timeToken && currentTime > timeToken) {
          // Token đã hết hạn, đăng xuất người dùng
          dispatch(clearAuth());
        }
      };
      // Kiểm tra thời gian hết hạn mỗi khi ứng dụng hoạt động
      const interval = setInterval(checkTokenExpiration, 1000); // Kiểm tra mỗi giây
      // Dọn dẹp
      return () => clearInterval(interval);
    }
  
  }, [timeToken, dispatch]);

  return (
    <Routes>
        {!token ? (
          <>
            <Route path="/" element={<Navigate to="/auth/sign-in" />} />
            <Route path="/auth" element={<LayoutAuth />}>
              <Route path="sign-in" element={<SignIn />} />
            </Route>
          </>
        ) : (
          <>
            {user.roles === 'admin' ? (
              <>
                <Route path="/" element={<Navigate to="/admin" />} />
                <Route path="/admin" element={<LayoutAdmin />}>
                  {RouterApp.RouterPrivate.map((router, index) => {
                    const Page = router.component;
                    return <Route key={index} path={router.path} element={<Page />} />;
                  })}
                </Route>
              </>
            ) : (
              <Route path="*" element={<Navigate to="/auth/sign-in" />} />
            )}
          </>
        )}
      </Routes>
  //   <Route
  //   path="/"
  //   element={<Navigate to="/admin/default" replace />}
  // />
  );
};

export default App;


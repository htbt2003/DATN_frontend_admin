import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";
import UserServices from 'services/UserServices';
import swal from "sweetalert";
// navigate("/auth/sign-in", { replace: true });

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  //kiểm tra token và đăng xuất
  const checkTokenExpiration = async () => {
    const decodedToken = jwtDecode(token);
    const timeToken = decodedToken.exp * 1000;
    const currentTime = Date.now();
  
      if (timeToken && currentTime > timeToken - 30000) {
        try {
          await UserServices.logout();
          dispatch(clearAuth());
          swal("Cảnh báo", "Phiên của bạn đã hết hạn. Xin vui lòng đăng nhập lại.", "warning");
          navigate("/auth/sign-in", { replace: true });
        } catch (error) {
          console.log(error);
        }
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const timeToken = decodedToken.exp * 1000;
      const currentTime = Date.now();
    
      if (timeToken && currentTime > timeToken) {
        dispatch(clearAuth());
        swal("Cảnh báo", "Phiên của bạn đã hết hạn. Xin vui lòng đăng nhập lại.", "warning");
        navigate("/auth/sign-in", { replace: true });
      } else {
        const interval = setInterval(checkTokenExpiration, 1000);
        return () => clearInterval(interval); 
      }
    }
  }, [token, dispatch, navigate]);

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


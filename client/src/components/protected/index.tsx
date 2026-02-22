import type { FC, ReactNode } from "react";
import { useProfile } from "../../service/auth";
import Loader from "../loader";
import { Navigate } from "react-router-dom";
interface Props {
  children: ReactNode;
  allowedRoles?: ("user" | "admin")[];
}

const Protected: FC<Props> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useProfile();

  if (isLoading) return <Loader />;

  // oturum açık değilse login sayfasına yönlendir
  if (!user) return <Navigate to="/login" replace />;

  // eğer rolü yetersizse anasayfaya yönlendir

  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/" replace />;

  // yetkisi olan kullanıcı sayfa içeriğini görebilsin
  return children;
};

export default Protected;

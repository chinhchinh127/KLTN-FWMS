import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
const KitchenRoute = ({ children }) => {
    return children;
};
//     const token = localStorage.getItem("token");
//     const decode = jwtDecode(token);
//     if (decode.role == "Kitchen") {
//         return children;
//     } else {
//         return Navigate("/");
//     }
// }

export default KitchenRoute


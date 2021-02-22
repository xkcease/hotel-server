const { verifyToken } = require('./jwt');

const superPermission = 0;
const seniorrPermission = 1;
const superPermissionRoutes = ['/getAdmins', '/register', '/updatePermission', '/deleteAdmin', '/updatePrice'];
const seniorPermissionRoutes = ['/addRoom', '/updateRoom', '/uploadImg', '/deleteRoom', '/uploadIntroImg',
    '/updateRoomIntro', '/updateHotelIntro'];

module.exports = function (req, res, next) {
    const token = req.get('Authorization');

    if (token) {
        verifyToken(token).then(result => {
            const permission = result.permission;
            let flag = true;

            if (seniorPermissionRoutes.indexOf(req.path) !== -1) {
                if (permission > seniorrPermission) {
                    flag = false;
                }
            }
            else if (superPermissionRoutes.indexOf(req.path) !== -1) {
                if (permission > superPermission) {
                    flag = false;
                }
            }

            if (flag) {
                next();
            }
            else {
                return res.json({ state: 403, msg: 'without permission' });
            }
        }).catch(err => {
            console.log(err);
            return res.json({ state: 403, msg: 'without permission' });
        })
    }
    else {
        return res.json({ state: 403, msg: 'without permission' });
    }
};
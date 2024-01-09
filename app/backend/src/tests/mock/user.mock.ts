import tokenUtils from "../../utils/token.utils"

export const userMock1 = {
  id: 1,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
    // senha: secret_user
}

export const userMock2 = {
  id: 2,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    // senha: secret_admin
}

export const serviceResponseLogin = {
  statusCode: 200,
  data: {
    token: tokenUtils.generateToken({
      id: userMock1.id,
      username: userMock1.username
    })
  }
}

export const serviceResponseRole = {
  statusCode: 200,
  data: {
    role: userMock1.role
  }
}
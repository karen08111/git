const user = {
    state: {
        token: sessionStorage.getItem('token'),
        logined: sessionStorage.getItem('logined') == 1,
        nickname: sessionStorage.getItem('nickname') || "noName",
    },

    mutations: {
        SET_TOKEN : (status, token) => {
            if (token) {
                sessionStorage.setItem('token', token)
            } else {
                sessionStorage.setItem('token', 0)
            }
        },
        SET_LOGINED: (state, status) => {
            if (status) {
                sessionStorage.setItem('logined', 1)
            } else {
                sessionStorage.setItem('logined', 0)
            }
            state.logined = status
        },
        SET_NICKNAME: (state, name, token) => {
            state.nickname = name
            state.token = token
            sessionStorage.setItem('nickname', name)
            sessionStorage.setItem('token', token)
        }
    },

    actions: {
        Logout({
            commit,
            state
        }) {
            commit('SET_LOGINED', false);
        },
        Login({
            commit,
            state
        }) {
            commit('SET_LOGINED', true);
        },
    }
}

export default user


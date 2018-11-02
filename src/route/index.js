export const routes = {
    path: '/act',
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(null, require('../views/App'));
        }, 'app')
    },
    indexRoute: {
        getComponent(nextState, cb) {
            require.ensure([], require => {
                cb(null, require('../views/Home'));
            }, 'app')
        }
    },
    childRoutes: [
        {
            path: 'egg',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../views/Egg'));
                }, 'egg');
            }
        },
        {
            path: 'mlottery',
            getComponent(nextState, cb) {
                require.ensure([], require => {
                    cb(null, require('../views/LotteryH5'));
                }, 'mlottery')
            },
        },
        {
            path: 'lottery',
            getComponent(nextState, cb) {
                require.ensure([], require => {
                    cb(null, require('../views/Lottery'));
                }, 'lottery')
            }
        },
        {
            path: 'killmonster',
            getComponent(nextState, cb) {
                require.ensure([], require => {
                    cb(null, require('../views/KillMonster'));
                }, 'killmonster')
            }
        }
    ]
}

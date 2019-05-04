const hat = require(`hat`);

const users = new Map();

const revokeAccess = (token) => {
    const existingUser = users.get(token);
    if (existingUser) {
        existingUser.blocked = true;
    }
};

const createOrUpdateUser = (user) => {
    const persistedUser = {
        ...user,
        timestamp: new Date().getTime(),
    };

    users.set(user.token, persistedUser);
    return persistedUser;
};

const getOrCreateUser = (token, companies) => {
    const existingUser = users.get(token);
    if (existingUser) {
        if (companies) {
            existingUser.companies = companies;
        }

        return existingUser;
    }

    const userId = hat();
    const companyId = hat();

    const newUser = {
        id: userId,
        name: `User_${userId}`,
        groups: [`collaborator`],
        companies: companies || [
            {
                groups: [
                    `collaborator`,
                ],
                host: companyId,
                title: `Company_${companyId}`,
            },
        ],
        timestamp: new Date().getTime(),
    };

    users.set(token, newUser);
    return newUser;
};

const TTL = 3 * 1000 * 60;

setInterval(() => {
    const killBefore = new Date().getTime() - TTL;

    for (const key of users.keys()) { // eslint-disable-line no-restricted-syntax
        const user = users.get(key);
        if (killBefore > user.timestamp) {
            users.delete(key);
        }
    }
}, 30 * 1000);

const getUser = (token) => users.get(token);

module.exports = {
    getUser,
    getOrCreateUser,
    revokeAccess,
    createOrUpdateUser,
};

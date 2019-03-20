const hat = require(`hat`);

const users = new Map();

const revokeAccess = (token) => {
    const existingUser = users.get(token);
    if (existingUser) {
        existingUser.blocked = true;
    }
};

const getUser = (token, newUserCompanies) => {
    const existingUser = users.get(token);
    if (existingUser) {
        return existingUser;
    }

    const userId = hat();
    const companyId = hat();

    const newUser = {
        id: userId,
        name: `User_${userId}`,
        groups: [`collaborator`],
        companies: newUserCompanies || [
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

module.exports = {
    getUser,
    revokeAccess,
};

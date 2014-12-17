var building = {
    datacenter: {
        img: 'server_clq',
        description: 'Give you one Bitcoin by hour and unblock the system administrator unit to increase your security',
        upgrades: {
            0: {price: 10, bitcoinRatio: 1, unitRatio: 1},
            1: {price: 100, bitcoinRatio: 2, unitRatio: 2},
            2: {price: 250, bitcoinRatio: 3, unitRatio: 3},
            3: {price: 450, bitcoinRatio: 4.5, unitRatio: 4.5},
            4: {price: 700, bitcoinRatio: 6, unitRatio: 6},
            5: {price: 1200, bitcoinRatio: 10, unitRatio: 10}
        }
    },
    personal_computer: {
        img: 'computer_clq',
        description: 'Unblock the zombie computer unit and increase your attack score.',
        upgrades: {
            0: {price: 50, unitRatio: 1},
            1: {price: 100, unitRatio: 2},
            2: {price: 250, unitRatio: 3},
            3: {price: 450, unitRatio: 4.5},
            4: {price: 700, unitRatio: 6},
            5: {price: 1200, unitRatio: 10}
        }
    },
    cave: {
        img: 'console_clq',
        description: 'Unblock the hacker unit to increase your attack, power and security score',
        upgrades: {
            0: {price: 100, unitRatio: 1},
            1: {price: 100, unitRatio: 2},
            2: {price: 250, unitRatio: 3},
            3: {price: 450, unitRatio: 4.5},
            4: {price: 700, unitRatio: 6},
            5: {price: 12000, unitRatio: 10}
        }
    }
};

module.exports = building;
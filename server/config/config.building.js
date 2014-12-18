var building = {
    datacenter: {
        name: 'Data center',
        img: 'server_clq',
        description: 'Give you one Bitcoin by hour and unblock the system administrator unit to increase your security',
        upgrades: {
            1: {price: 10, bitcoinRatio: 1, unitRatio: 1},
            2: {price: 100, bitcoinRatio: 2, unitRatio: 1.2},
            3: {price: 250, bitcoinRatio: 3, unitRatio: 1.4},
            4: {price: 450, bitcoinRatio: 4.5, unitRatio: 1.6},
            5: {price: 700, bitcoinRatio: 6, unitRatio: 1.8},
            6: {price: 1200, bitcoinRatio: 10, unitRatio: 2}
        }
    },
    personal_computer: {
        name: 'Personal Computers',
        img: 'computer_clq',
        description: 'Unblock the zombie computer unit and increase your attack score.',
        upgrades: {
            1: {price: 50, unitRatio: 1},
            2: {price: 200, unitRatio: 1.2},
            3: {price: 450, unitRatio: 1.4},
            4: {price: 800, unitRatio: 1.6},
            5: {price: 1100, unitRatio: 1.8},
            6: {price: 1500, unitRatio: 2}
        }
    },
    cave: {
        name: 'Caves',
        img: 'console_clq',
        description: 'Unblock the hacker unit to increase your attack, power and security score',
        upgrades: {
            1: {price: 100, unitRatio: 1},
            2: {price: 350, unitRatio: 1.2},
            3: {price: 600, unitRatio: 1.4},
            4: {price: 950, unitRatio: 1.6},
            5: {price: 1400, unitRatio: 1.8},
            6: {price: 2000, unitRatio: 2}
        }
    }
};

module.exports = building;

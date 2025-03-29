class BoardRepository {
    static getConnectionsBoard(boardId) {
        return this.boards[boardId];
    }

    static boards = {
        '0': {
            Categories: [
                {
                    CategoryId: 1,
                    Label: '1,2,3,4',
                    Items: [
                        { Label: '1' },
                        { Label: '2' },
                        { Label: '3' },
                        { Label: '4' }
                    ]
                },
                {
                    CategoryId: 2,
                    Label: '5,6,7,8',
                    Items: [
                        { Label: '5' },
                        { Label: '6' },
                        { Label: '7' },
                        { Label: '8' }
                    ]
                },
                {
                    CategoryId: 3,
                    Label: '9,10,11,12',
                    Items: [
                        { Label: '9' },
                        { Label: '10' },
                        { Label: '11' },
                        { Label: '12' }
                    ]
                },
                {
                    CategoryId: 4,
                    Label: '13,14,15,16',
                    Items: [
                        { Label: '13' },
                        { Label: '14' },
                        { Label: '15' },
                        { Label: '16' }
                    ]
                }
            ]
        },
        '1': {
            Categories: [
                {
                    CategoryId: 1,
                    Label: 'horses',
                    Items: [
                        { Label: 'stallion' },
                        { Label: 'colt' },
                        { Label: 'filly' },
                        { Label: 'steed' }
                    ]
                },
                {
                    CategoryId: 2,
                    Label: 'related to nintendo system names',
                    Items: [
                        { Label: 'super' },
                        { Label: '64' },
                        { Label: 'U' },
                        { Label: 'cube' }
                    ]
                },
                {
                    CategoryId: 3,
                    Label: 'things featuring pages',
                    Items: [
                        { Label: 'book' },
                        { Label: 'newspaper' },
                        { Label: 'website' },
                        { Label: 'essay' }
                    ]
                },
                {
                    CategoryId: 4,
                    Label: 'actors in paige\'s favorite movies',
                    Items: [
                        { Label: 'law' },
                        { Label: 'rock' },
                        { Label: 'streep' },
                        { Label: 'pitt' }
                    ]
                }
            ]
        },
        '2': {
            Categories: [
                {
                    CategoryId: 1,
                    Label: 'cw shows',
                    Items: [
                        { Label: 'arrow' },
                        { Label: 'supernatural' },
                        { Label: 'supergirl' },
                        { Label: 'the flash' }
                    ]
                },
                {
                    CategoryId: 2,
                    Label: 'avatars',
                    Items: [
                        { Label: 'korra' },
                        { Label: 'aang' },
                        { Label: 'sozin' },
                        { Label: 'kyoshi' }
                    ]
                },
                {
                    CategoryId: 3,
                    Label: 'jobs at a college',
                    Items: [
                        { Label: 'dean' },
                        { Label: 'professor' },
                        { Label: 'ra' },
                        { Label: 'ta' }
                    ]
                },
                {
                    CategoryId: 4,
                    Label: 'robins',
                    Items: [
                        { Label: 'grayson' },
                        { Label: 'todd' },
                        { Label: 'drake' },
                        { Label: 'wayne' }
                    ]
                }
            ]
        },
        '3': {
            Categories: [
                {
                    CategoryId: 1,
                    Label: 'paige pets',
                    Items: [
                        { Label: 'arrow' },
                        { Label: 'dean' },
                        { Label: 'korra' },
                        { Label: 'reed' }
                    ]
                },
                {
                    CategoryId: 2,
                    Label: 'mortal kombat ninjas',
                    Items: [
                        { Label: 'scorpion' },
                        { Label: 'rain' },
                        { Label: 'smoke' },
                        { Label: 'reptile' }
                    ]
                },
                {
                    CategoryId: 3,
                    Label: 'games featuring kings',
                    Items: [
                        { Label: 'kingdom hearts' },
                        { Label: 'shogi' },
                        { Label: 'chess' },
                        { Label: 'checkers' }
                    ]
                },
                {
                    CategoryId: 4,
                    Label: 'first syllables of anime character',
                    Items: [
                        { Label: 'go' },
                        { Label: 'na' },
                        { Label: 'ken' },
                        { Label: 'yu' }
                    ]
                }
            ]
        },
        '4': {
            Categories: [
                {
                    CategoryId: 1,
                    Label: 'batman actors',
                    Items: [
                        { Label: 'christian' },
                        { Label: 'ben' },
                        { Label: 'robert' },
                        { Label: 'george' }
                    ]
                },
                {
                    CategoryId: 2,
                    Label: 'robins',
                    Items: [
                        { Label: 'richard' },
                        { Label: 'jason' },
                        { Label: 'tim' },
                        { Label: 'damien' }
                    ]
                },
                {
                    CategoryId: 3,
                    Label: 'batman father figures',
                    Items: [
                        { Label: 'alfred' },
                        { Label: 'jim' },
                        { Label: 'lucius' },
                        { Label: 'thomas' }
                    ]
                },
                {
                    CategoryId: 4,
                    Label: 'batman villains',
                    Items: [
                        { Label: 'edward' },
                        { Label: 'oswald' },
                        { Label: 'harvey' },
                        { Label: 'johnathan' }
                    ]
                }
            ]
        },
        '5': {
            Categories: [
                {
                    CategoryId: 1,
                    Label: 'paige smoothie ingredients',
                    Items: [
                        { Label: 'yogurt' },
                        { Label: 'blueberry' },
                        { Label: 'strawberry' },
                        { Label: 'peaches' }
                    ]
                },
                {
                    CategoryId: 2,
                    Label: 'shades of green',
                    Items: [
                        { Label: 'lime' },
                        { Label: 'vermillion' },
                        { Label: 'emerald' },
                        { Label: 'jade' }
                    ]
                },
                {
                    CategoryId: 3,
                    Label: 'paige poke ingredients',
                    Items: [
                        { Label: 'scallion' },
                        { Label: 'edamame' },
                        { Label: 'tuna' },
                        { Label: 'rice' }
                    ]
                },
                {
                    CategoryId: 4,
                    Label: 'saiyan name vegetable puns',
                    Items: [
                        { Label: 'carrot' },
                        { Label: 'raddish' },
                        { Label: 'broccoli' },
                        { Label: 'cabbage' }
                    ]
                }
            ]
        },
        '6': {
            Categories: [
                {
                    CategoryId: 1,
                    Label: 'harry potter book titles',
                    Items: [
                        { Label: 'stone' },
                        { Label: 'goblet' },
                        { Label: 'prince' },
                        { Label: 'order' }
                    ]
                },
                {
                    CategoryId: 2,
                    Label: 'star wars titles',
                    Items: [
                        { Label: 'rise' },
                        { Label: 'strikes' },
                        { Label: 'attack' },
                        { Label: 'awakens' }
                    ]
                },
                {
                    CategoryId: 3,
                    Label: 'cities paige has lived in',
                    Items: [
                        { Label: 'charleston' },
                        { Label: 'houston' },
                        { Label: 'seattle' },
                        { Label: 'austin' }
                    ]
                },
                {
                    CategoryId: 4,
                    Label: 'real housewives of _____',
                    Items: [
                        { Label: 'atlanta' },
                        { Label: 'new jersey' },
                        { Label: 'salt lake city' },
                        { Label: 'new york city' }
                    ]
                }
            ]
        },
        '7': {
            Categories: [
                {
                    CategoryId: 1,
                    Label: 'movie secret agents',
                    Items: [
                        { Label: 'james' },
                        { Label: 'jason' },
                        { Label: 'ethan' },
                        { Label: 'eggsy' }
                    ]
                },
                {
                    CategoryId: 2,
                    Label: 'james bond actors',
                    Items: [
                        { Label: 'sean' },
                        { Label: 'roger' },
                        { Label: 'george' },
                        { Label: 'daniel' }
                    ]
                },
                {
                    CategoryId: 3,
                    Label: 'Groups of 7',
                    Items: [
                        { Label: 'sin' },
                        { Label: 'chakra' },
                        { Label: 'sea' },
                        { Label: 'continent' }
                    ]
                },
                {
                    CategoryId: 4,
                    Label: 'jame bond movie 1st word',
                    Items: [
                        { Label: 'tomorrow' },
                        { Label: 'quantum' },
                        { Label: 'die' },
                        { Label: 'live' }
                    ]
                }
            ]
        },
        '8': {
            Categories: [
                {
                    CategoryId: 1,
                    Label: 'eeveelutions ____eon',
                    Items: [
                        { Label: 'esp' },
                        { Label: 'flare' },
                        { Label: 'vapor' },
                        { Label: 'leaf' }
                    ]
                },
                {
                    CategoryId: 2,
                    Label: 'pokemon game names',
                    Items: [
                        { Label: 'ruby' },
                        { Label: 'sword' },
                        { Label: 'scarlet' },
                        { Label: 'diamond' }
                    ]
                },
                {
                    CategoryId: 3,
                    Label: 'pokemon humans',
                    Items: [
                        { Label: 'ash' },
                        { Label: 'lance' },
                        { Label: 'gary' },
                        { Label: 'oak' }
                    ]
                },
                {
                    CategoryId: 4,
                    Label: 'pokeballs',
                    Items: [
                        { Label: 'master' },
                        { Label: 'quick' },
                        { Label: 'lure' },
                        { Label: 'ultra' }
                    ]
                }
            ]
        },
        '9': {
            Categories: [
                {
                    CategoryId: 2,
                    Label: 'The I in an initialism (LTI, UWI, API, PI)',
                    Items: [
                        { Label: 'inter-\noperability' },
                        { Label: 'integrals' },
                        { Label: 'interface' },
                        { Label: 'interval' }
                    ]
                },
                {
                    CategoryId: 1,
                    Label: 'UWI teammember name homophones',
                    Items: [
                        { Label: 'been' },
                        { Label: 'hue' },
                        { Label: 'fur' },
                        { Label: 'criss' }
                    ]
                },
                {
                    CategoryId: 3,
                    Label: 'spider-man title adjectives',
                    Items: [
                        { Label: 'superior' },
                        { Label: 'amazing' },
                        { Label: 'spectactular' },
                        { Label: 'friendly-neighborhood' }
                    ]
                },
                {
                    CategoryId: 4,
                    Label: 'words that are the same in spanish and english',
                    Items: [
                        { Label: 'actor' },
                        { Label: 'animal' },
                        { Label: 'special' },
                        { Label: 'tropical' }
                    ]
                }
            ]
        }
    };
}
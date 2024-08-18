import * as crypto from 'crypto';

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// TODO maybe URL
export function extractFileName(filePath: string, removeExtension: boolean = true) {
    const urlArr = filePath.split('/')
    const fullName = urlArr[urlArr.length - 1]
    let fileName = fullName
    if (removeExtension) {
        fileName = fullName.split('.')[0]
    }
    return fileName
}

export namespace Crypto {
    export function createPasswordHash(password: string) {
        return crypto.createHmac('sha256', password).digest('hex')
    }

    // compare plain-text password and hash
    export function  comparePasswords(password: string, hash: string) {
        return createPasswordHash(password) == hash
    }

    export function createToken() {
        return crypto.randomBytes(20).toString("base64url");
    }

    export function createResetToken() {
        const resetTokenValue = crypto.randomBytes(20).toString("base64url");
        const resetTokenSecret = crypto.randomBytes(10).toString("hex")
        return {resetTokenValue, resetTokenSecret}
    }

    enum AlphabetOrderType {
        LoverCase,
        UpperCase,
        Number,
        SpecialCharacter
    }

    const alphabets = [
        {
            type: AlphabetOrderType.LoverCase,
            length: 26,
            alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        },
        {
            type: AlphabetOrderType.UpperCase,
            length: 26,
            alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        },
        {
            type: AlphabetOrderType.Number,
            length: 10,
            alphabet: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        },
        {
            type: AlphabetOrderType.SpecialCharacter,
            length: 31,
            alphabet: ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~'],
        }
    ]

    export function calculateEntropy(str: string) {
        let L = 0
        const strArr = Array.from(str)
        const usedAlpas = new Set<AlphabetOrderType>()
        for (const set of alphabets) {
            if (strArr.some(c => set.alphabet.includes(c))) {
                L += set.length
                usedAlpas.add(set.type)
            }
        }
        return {
            entropy: Math.log2(Math.pow(L, str.length)),
            alphabetLength: L,
            alphabetsUsed: usedAlpas
        }
    }

}

export const generateRandom = () => Math.random().toString(36).substring(2, 15)

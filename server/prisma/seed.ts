import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

    const user = await prisma.user.create({
        data: {
            name: 'Jhon Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/JoseNeto09.png',
        }
    })

    const poll = await prisma.pool.create({
        data: {
            title: 'Example Poll',
            code: 'BOL123',
            ownerId: user.id,

            Participants: {
                create: {
                    userId: user.id
                }
            }
        },
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T12:00:00.200Z',
            fristTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.200Z',
            fristTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    fristTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: poll.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main()
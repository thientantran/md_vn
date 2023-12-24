const {PrismaClient} = require("@prisma/client")

const database = new PrismaClient()

async function main(){
  try {
    await database.category.createMany({
      data: [
        {name: 'All'},
        {name: 'Cardiology'},
        {name: 'Diabetes & Endocrinology'},
        {name: 'Neruology'},
        {name: 'Psychiatry'},
        {name: 'Other'},
      ]
    })
    console.log("Success")
  } catch (error) {
    console.log('Error seeding the database categories: ', error)
  }finally{
    await database.$disconnect()
  }
}

main()
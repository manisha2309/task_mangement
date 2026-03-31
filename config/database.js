import { Sequelize } from "sequelize";
 
const sequelize = new Sequelize("task_manager", "root", "manisha@2004", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
 
export default sequelize;
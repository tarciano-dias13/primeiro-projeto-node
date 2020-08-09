import { uuid } from 'uuidv4';

//Entidades sao declaradas com classes
class Appointment {
    id: string;

    provider: string;

    date: Date;

    //Quando uma nova instacia e criada o construtor recebe os atributos desestruturados da classe
   // e o metodo Omit do TS tipa com o primeiro parametro e "remove" o id dos pametros
    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date
    }
}
export default Appointment;

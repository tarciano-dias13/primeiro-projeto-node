import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
//Entidades sao declaradas como classes
class Appointment {

    //decorator para transformar a propriedade da classe em uma coluna de identificado unico da tabela
    @PrimaryGeneratedColumn('uuid')
    id: string;
    //decorator para transformar a propriedade da classe em coluna o parametro indica o tipo do param (string as default)
    @Column()
    provider: string;

    @Column('timestamp with time zone')
    date: Date;

}
export default Appointment;

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Users from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
//Entidades sao declaradas como classes
class Appointment {

    //decorator para transformar a propriedade da classe em uma coluna de identificador unico da tabela
    @PrimaryGeneratedColumn('uuid')
    id: string;
    //decorator para transformar a propriedade da classe em coluna o parametro indica o tipo do param (string as default)
    @Column()
    provider_id: string;
    //Construindo relacionamento para identificar objeto users diretamente do appointments(nao apenas o id)
    @ManyToOne(() => Users)
    @JoinColumn({ name: 'provider_id' })
    provider: Users;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
export default Appointment;

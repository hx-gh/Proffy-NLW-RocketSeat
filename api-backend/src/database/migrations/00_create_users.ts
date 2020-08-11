import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('users', table => {
        table.increments('id_user').primary();
        table.string('user_name').notNullable();
        table.string('user_avatar').notNullable();
        table.string('user_whatsapp').notNullable();
        table.string('user_bio').notNullable();

    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('users');
}
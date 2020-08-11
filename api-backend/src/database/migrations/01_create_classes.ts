import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('classes', table => {
        table.increments('id_class').primary();
        table.string('class_subject').notNullable();
        table.decimal('class_price').notNullable();

        table.integer('id_user')
            .notNullable()
            .references('id_user')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('classes');
}
import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id_schedule_class').primary();
        table.integer('schedule_class_week_day').notNullable();
        table.integer('schedule_class_from').notNullable();
        table.integer('schedule_class_to').notNullable();

        table.integer('id_class')
            .notNullable()
            .references('id_class')
            .inTable('classes')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('classes');
}
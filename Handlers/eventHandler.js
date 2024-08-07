const path = require('path');

function loadEvents(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Sự kiện', 'Trạng thái');

    const folders = fs.readdirSync('./Events');
    for (const folder of folders) {
        const folderPath = `./Events/${folder}`;
        const stat = fs.lstatSync(folderPath);
        if (!stat.isDirectory()) {
            continue;
        }
        const files = fs.readdirSync(folderPath).filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const event = require(path.join('..', folderPath, file));

            if (event.rest) {
                if (event.once)
                    client.rest.once(event.name, (...args) => 
                    event.execute(...args, client)
                );
                else
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args, client)
                );
            } else {
                if (event.once)
                    client.once(event.name, (...args) => event.execute (...args, client));
                else client.on(event.name, (...args) => event.execute (...args, client));
            }
            table.addRow(file, "Sẵn sàng");
        }
    }
    return console.log(table.toString(), "\nCác sự kiện đã load thành công");
}

module.exports = {loadEvents};
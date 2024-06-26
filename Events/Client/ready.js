const mongoose = require('mongoose');
const config = require("../../config.json");
const { ActivityType } = require('discord.js');
const Levels = require("discord.js-leveling");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        try {
            await mongoose.connect(config.mongodb || '');

            console.log('Đã kết nối thành công MongoDB.');
        } catch (error) {
            console.error('Kết nối MongoDB thất bại:', error);
        }

        Levels.setURL(config.mongodb);

        console.log(`${client.user.username} đang sẵn sàng!`);

        const statuses = [
            { type: ActivityType.Custom, name: 'customname', state: 'Máy chủ tệ nhất Việt Nam' },
            { type: ActivityType.Playing, name: 'tại MineKeo.com' },
            { type: ActivityType.Custom, name: 'customname', state: 'Khò khò' },
            { type: ActivityType.Custom, name: 'customname', state: 'Cherry sắp ra mắt rồi!' },
            { type: ActivityType.Custom, name: 'customname', state: 'Hí anh em!' },
            // Thêm các status khác tùy ý
        ];

        let currentStatusIndex = 0;

        setInterval(() => {
            const status = statuses[currentStatusIndex];
            client.user.setPresence({
                status: 'idle',
                activities: [status],
            });
            
            currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
        }, 60000); // Đổi status mỗi 60 giây
    },
};
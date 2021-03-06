const recommendServer = require("../../../service/recommendServer");
const formatResponse = require("../../../common/formatResponse");

class labManage {
    async add(ctx, next) {
        const {title, description, url, source, online} = ctx.request.body;
        const result = await recommendServer.add({
            title, description, url, source, online
        });
        if (result) {
            ctx.body = formatResponse.success(result)
        } else {
            ctx.body = formatResponse.error("id need unique")
        }
    }

    async get(ctx, next) {
        const result = await recommendServer.getById(ctx.query.id);
        ctx.body = formatResponse.success(result)
    }

    async List(ctx, next) {
        const {page, size, type} = ctx.query;
        const params = {page, size};
        if (type) {
            Object.assign(params, {query: {type}})
        }
        const result = await recommendServer.getDataList(params);
        ctx.body = formatResponse.success({list: result, count: result.count})
    }

    async delete(ctx, next) {
        const result = await recommendServer.deleteById(ctx.request.body.id);
        if (result) {
            ctx.body = formatResponse.success(result)
        } else {
            ctx.body = formatResponse.error("delete db error")
        }
    }

    async update(ctx, next) {
        const {title, description, url, source, online, id} = ctx.request.body;
        const result = await recommendServer.update({
            title, description, url, source, online
        }, id);
        if (result) {
            ctx.body = formatResponse.success({result})
        } else {
            ctx.body = formatResponse.error("id need unique")
        }
    }
}

module.exports = new labManage();
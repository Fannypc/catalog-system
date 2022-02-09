const { Stock } = require('../../models');

export async function create(req, res) {
    try {
        const stocks = await Stock.create(req.body);
        res.send(stocks);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function all(req, res) {
    try {
        const stocks = await Stock.findAll();
        res.send(stocks);
    } catch (err) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function info(req, res) {
    try {
        const stock = await Stock.findOne({where: {id: req.params.id}});

        if(stock && !req.user) {
            // stock.increment('timesQueried');
            // stock.save();
            await stock.increment('timesQueried', {by: 1});
        }
        await stock.increment('timesQueried', {by: 1});
        stock ? res.send(stock) : res.sendStatus(404);
    } catch (err) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function update(req, res) {
    try{
        let stockId = req.params.id;
        let {ticker, name, price, categoryId} = req.body;
        const stock = await Stock.update({
            ticker,
            name,
            price,
            categoryId,
            updated_at: new Date()
        }, { returning: true, plain: true, where: {id: stockId} });

        res.json(stock);
    }catch(error){
        console.log(error);
        res.sendStatus(400);
    }
}

export async function destroy(req, res) {
    try{
        let stockId = req.params.id;
        let stock = await Stock.findOne({
            where: {
                id: stockId
            }
        });

        if (stock){
            await Stock.destroy({
                where: {
                    id: stockId
                } 
            });
            res.json({message: "Stock has been deleted", stock});
        }else{
            res.status(400).json({message: "Failed to delete stock"});
        }
    }catch (error){
        res.sendStatus(400);
    }
}
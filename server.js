import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
const PORT = 3000;

app.get('/api/planets', async (req ,res) => {
    try {
        res.json({"test":"test"});
    } catch (err) {
        console.err("error: ", err);
        res.status(500).send("error")
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
import { Router } from "express";

export const index_router = Router()

index_router.get('/', (req, res) => {
    res.send("Hello")
})
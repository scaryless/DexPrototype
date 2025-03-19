import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { swapRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/tokens", async (_req, res) => {
    const tokens = await storage.getTokens();
    res.json(tokens);
  });

  app.get("/api/tokens/:chain", async (req, res) => {
    const tokens = await storage.getTokensByChain(req.params.chain);
    res.json(tokens);
  });

  app.post("/api/swap/quote", async (req, res) => {
    try {
      const data = swapRequestSchema.parse(req.body);
      
      const fromPrice = await storage.getTokenPrice(data.fromToken, data.fromChain);
      const toPrice = await storage.getTokenPrice(data.toToken, data.toChain);
      
      const exchangeRate = toPrice / fromPrice;
      const estimatedOutput = data.amount * exchangeRate;
      
      // Simulate network fees based on chains
      const fees = {
        ETH: 0.001,
        BSC: 0.0005,
        SOL: 0.00001
      };
      
      res.json({
        estimatedOutput,
        fee: fees[data.toChain as keyof typeof fees],
        exchangeRate
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid swap request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

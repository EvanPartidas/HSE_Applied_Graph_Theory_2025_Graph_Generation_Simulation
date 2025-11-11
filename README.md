# Homework 6 — Random Graph Generation (Applied Graph Theory)

This repository contains a small React + TypeScript app used to explore random graph generation (Erdős–Rényi model) and visualize the probability that a graph is connected as a function of edge probability p. It uses Vite for development and @mui/x-charts for plotting.

Features

- Generate 100 random graphs (Erdős–Rényi) with n = 1000 and random p values.
- Check connectivity for each generated graph and plot the results as a scatter plot.
- Show a reference line for the theoretical threshold ln(n)/n.

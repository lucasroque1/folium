function jaccard(a = [], b = []) {
  const A = new Set(a.map(x => x.toLowerCase()));
  const B = new Set(b.map(x => x.toLowerCase()));
  const inter = new Set([...A].filter(x => B.has(x)));
  const union = new Set([...A, ...B]);
  if (union.size === 0) return 0;
  return inter.size / union.size;
}

function recommend(items = [], target, n = 5) {
  const scores = items
    .filter(it => it._id.toString() !== target._id.toString())
    .map(it => {
      const gScore = jaccard(it.genres || [], target.genres || []);
      const tScore = jaccard(it.tags || [], target.tags || []);
      const score = gScore * 0.7 + tScore * 0.3;
      return { item: it, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(x => x.item);
  return scores;
}

module.exports = { recommend };

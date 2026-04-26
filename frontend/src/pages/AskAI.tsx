import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { askAI } from '@/service/ai';

export default function AskAI() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await askAI(query);
      setResponse(res);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to connect to the AI backend.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Ask AI
        </h1>
        <p className="mt-2 text-zinc-500">
          Your personal AI assistant. Ask any career or general questions.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <Textarea
            placeholder="What would you like to ask?"
            className="min-h-[100px] resize-y"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          <div className="flex justify-end">
            <Button onClick={handleAsk} disabled={loading || !query.trim()}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {loading ? 'Thinking...' : 'Ask AI'}
            </Button>
          </div>
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        </CardContent>
      </Card>

      {response && (
        <Card className="bg-zinc-50/50">
          <CardHeader>
            <CardTitle className="text-lg text-zinc-700">AI Response</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-zinc-800 leading-relaxed">
              {response}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

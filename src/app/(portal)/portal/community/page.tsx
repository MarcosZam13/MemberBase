// page.tsx — Feed de posts de la comunidad ordenados por pin y fecha

import Link from "next/link";
import { MessageSquare, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/shared/PostCard";
import { getPosts } from "@/actions/community.actions";
import { getUserSubscription } from "@/actions/payment.actions";
import { formatDate } from "@/lib/utils";

export default async function CommunityPage() {
  const [posts, subscription] = await Promise.all([
    getPosts(),
    getUserSubscription(),
  ]);

  const hasActiveSubscription = subscription?.status === "active";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Comunidad</h1>
          <p className="text-muted-foreground">
            {posts.length} publicación{posts.length !== 1 ? "es" : ""}
          </p>
        </div>
        {hasActiveSubscription && (
          <Button asChild>
            <Link href="/portal/community/new" className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Nuevo post
            </Link>
          </Button>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p className="font-medium">Aún no hay publicaciones</p>
          <p className="text-sm mt-1">¡Sé el primero en compartir algo con la comunidad!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.author?.full_name ?? "Miembro"}
              date={formatDate(post.created_at)}
              commentCount={post.comment_count ?? 0}
              isPinned={post.is_pinned}
            />
          ))}
        </div>
      )}
    </div>
  );
}

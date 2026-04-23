
import { useState } from "react";
import type { FrontGetMadingBySlugUseCase } from "../../../../../../core/usecases/mading/client/user-mading/front-get-mading-by-slug.usecase";
import type { FrontMadingEntity } from "../../../../../../core/entities/front-mading.entity";

export const useGetMadingBySlug = (frontGetMadingBySlugUseCase: FrontGetMadingBySlugUseCase) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrontMadingEntity[] | null>();

  const executeGetMadingBySlugHook = async (slug: string) => {
    try {
      setLoading(true);
      const response = await frontGetMadingBySlugUseCase.execute(slug);
      setData(response);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { executeGetMadingBySlugHook, loading, error, data };
};
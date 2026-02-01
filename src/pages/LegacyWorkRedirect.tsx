import { Navigate, useParams } from 'react-router-dom';

const LEGACY_WORK_TO_CASE_STUDY: Record<string, string> = {
  'nomad-gear': 'nomad-gear',
  'velvet-rose': 'velvet-rose',
  'gentlemans-blade': 'gentlemans-blade',
  'pop-playground': 'pop-playground',
  'tag-landing-page': 'tag',
  'utility-sheet': 'utilitysheet',
};

const LegacyWorkRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const mapped = slug ? LEGACY_WORK_TO_CASE_STUDY[slug] : undefined;

  if (mapped) {
    return <Navigate to={`/case-study/${mapped}`} replace />;
  }

  return <Navigate to="/#work" replace />;
};

export default LegacyWorkRedirect;

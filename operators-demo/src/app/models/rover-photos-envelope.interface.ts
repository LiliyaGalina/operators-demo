export interface IRoverPhotosEnvelope {
  photos: Array<IRoverPhoto>;
}

export interface IRoverPhoto {
  camera: IRoverCamera;
  earth_date: string;
  id: number;
  img_src: string;
  sol: number;
  rover: IRover;
}

interface IRoverCamera {
  full_name: string;
  id: number;
  name: string;
  rover_id: number;
}

interface IRover {
  cameras: Array<IRoverCamera>;
  id: number;
  landing_date: string;
  launch_date: string;
  max_date: string;
  max_sol: number;
  name: string;
  status: string;
  total_photos: number;
}

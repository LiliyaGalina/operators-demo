export interface IAsteroidsEnvelope {
  element_count: number;
  links: {
    next?: string;
    prev?: string;
    self: string;
  };
  near_earth_objects: { [key: string]: Array<INearEarthObject> };
}

export interface INearEarthObject {
  absolute_magnitude_h: number;
  id: string;
  is_potentially_hazardous_asteroid: boolean;
  is_sentry_object: boolean;
  name: string;
  nasa_jpl_url: string;
  neo_reference_id: string;
  links: {
    self: string;
  };
  estimated_diameter: {
    feet: IEstimatedDiameter;
    kilometers: IEstimatedDiameter;
    meters: IEstimatedDiameter;
    miles: IEstimatedDiameter;
  };
  close_approach_data: Array<{
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    orbiting_body: string;
    miss_distance: {
      astronomical: string;
      kilometers: string;
      lunar: string;
      miles: string;
    };
    relative_velocity: {
      kilometers_per_hour: string;
      kilometers_per_second: string;
      miles_per_hour: string;
    };
  }>;
}

interface IEstimatedDiameter {
  estimated_diameter_max: number;
  estimated_diameter_min: number;
}

interface IOrbitalData {
  aphelion_distance: string;
  ascending_node_longitude: string;
  data_arc_in_days: number;
  eccentricity: string;
  epoch_osculation: string;
  equinox: string;
  first_observation_date: string;
  inclination: string;
  jupiter_tisserand_invariant: string;
  last_observation_date: string;
  mean_anomaly: string;
  mean_motion: string;
  minimum_orbit_intersection: string;
  observations_used: number;
  orbit_determination_date: string;
  orbit_id: string;
  orbit_uncertainty: string;
  orbital_period: string;
  perihelion_argument: string;
  perihelion_distance: string;
  perihelion_time: string;
  semi_major_axis: string;
  orbit_class: {
    orbit_class_description: string;
    orbit_class_range: string;
    orbit_class_type: string;
  };
}

export type INearEarthObjectWithOrbitalData = INearEarthObject & {
  orbital_data?: IOrbitalData;
};

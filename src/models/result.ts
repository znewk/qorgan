export interface Result<VType> {
  status: boolean;
  text: string;
  data: VType;
}

import { PropType } from 'vue';

interface ICardInfo {
  title: string;
  tag: string;
  desc: string;
  cost: string;
}

export const taskCardProps = {
  cardInfo: {
    type: Object as PropType<ICardInfo>,
    default: () => ({})
  }
};

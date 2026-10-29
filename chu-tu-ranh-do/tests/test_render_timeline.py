import sys
import unittest
from pathlib import Path

sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'scripts'))
from build_wifi_render import captions,locate


class RenderTimelineTests(unittest.TestCase):
    def words(self,text):
        return [{'word':w,'start':i*.2,'end':(i+1)*.2} for i,w in enumerate(text.split())]

    def test_question_stays_intact_without_orphan_tail(self):
        text='Nhưng tiền gói cước cao hơn có làm sóng đi xuyên bức tường tốt hơn không?'
        result=captions(self.words(text))
        self.assertEqual([c['text'] for c in result],[text])

    def test_long_sentence_preserves_exact_words_and_boundaries(self):
        text='Tư sẽ nhớ thứ tự này: so ở gần và xa bằng cùng thiết bị; kiểm vị trí và vật cản; xem băng tần, thiết bị và môi trường; rồi mới cân nhắc đường nối bằng dây hoặc mở rộng vùng phủ.'
        words=self.words(text)
        result=captions(words)
        self.assertEqual(' '.join(c['text'] for c in result),text)
        self.assertTrue(all(len(c['text'])<=90 for c in result))
        self.assertTrue(all(len(c['text'].split())>=2 for c in result))
        self.assertEqual(result[0]['start'],words[0]['start'])
        self.assertEqual(result[-1]['end'],words[-1]['end'])

    def test_ambiguous_or_missing_cue_is_rejected(self):
        words=self.words('hai mươi vẫn còn hai mươi')
        with self.assertRaises(ValueError): locate(words,'hai mươi')
        with self.assertRaises(ValueError): locate(words,'chín trăm')

    def test_punctuation_and_case_do_not_move_cue(self):
        words=self.words('Tư đây. Vô phòng ngủ, xem thử.')
        self.assertEqual(locate(words,'vô phòng ngủ'),round(words[2]['start']*30))


if __name__=='__main__': unittest.main()

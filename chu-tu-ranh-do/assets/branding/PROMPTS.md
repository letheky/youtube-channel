# Prompt tạo nhận diện Chú Tư

Công cụ: image_gen tích hợp, không gọi Image API trả phí. Ngày 28/10/2026.

## Avatar — prompt đã dùng

Use case: logo-brand. Asset: YouTube channel avatar, one square 1024x1024 image. Create an original Vietnamese male cartoon host named Chú Tư for the home-appliance explainer channel 'Chú Tư Rành Đồ'. Friendly curious middle-aged Southern Vietnamese man around 45, salt-and-pepper short hair, rounded rectangular face, warm tan skin, round dark glasses, NO moustache or beard. Indigo blue collared work shirt with sleeves rolled, subtle mustard accent. Tight head-and-shoulders portrait, expressive raised eyebrow, approachable confident smile, one visible hand holding a simple small magnifying glass beside face. Clear bold flat 2D editorial cartoon, thick clean navy outlines, sophisticated warm cream background, restrained indigo and amber palette, excellent silhouette legible at 48px. All key content inside the central circular crop with generous safe margin, no tiny details. Original design distinct from an elderly accountant, no red notebook, no pen behind ear, no checked shirt. No text, no lettering, no numbers, no logos, no watermarks. A single final avatar image, not a mockup or sheet.

Lưu ý: công cụ thực tế xuất 1254×1254, đã kiểm và dùng làm avatar; kích thước trong prompt không được coi là metadata đầu ra.

## Banner — prompt tạo nền đầu

Use case: ads-marketing / channel branding. Create ONE finished YouTube channel banner, 2560x1440px landscape 16:9, not a mockup and not a collage sheet. Use attached portrait as the exact character identity and art style reference for Chú Tư: middle aged Vietnamese man with salt-and-pepper short hair, round dark glasses, indigo blue shirt with mustard details, friendly curious smile. Clean rich 2D editorial cartoon. Restrained cream, deep indigo and amber palette. This banner belongs to a Vietnamese household-appliance explainer channel. Calm warm cream backdrop, a few simple appliance silhouettes (air conditioner, refrigerator, router) as subtle low-contrast decorative illustrations toward far outer sides. Critical crop requirement: ALL text and the character's complete head must sit inside a compact CENTRAL horizontal band x=560..2000 and y=555..880 of the 2560x1440 canvas, leaving the whole top 38% and bottom 38% mostly quiet background. Put small shoulder portrait around x=740,y=720, fully inside safe band; title and tagline to its right. Main title in large crisp bold legible Vietnamese lettering, exact text 'CHÚ TƯ RÀNH ĐỒ'. Secondary tagline smaller but readable, exact text 'Hiểu món mình xài, quyết định cho đáng.' Correct every Vietnamese accent exactly, no other text. Use a clear well-spaced dark indigo typeface. Very clean professional editorial hierarchy, not childish, no photorealism, no tiny captions, no stock icons, no logo of any manufacturer, no borders or frames, no watermark, no upload schedule or social handles. Banner should feel like one continuous illustration with generous negative space.

Tham chiếu: avatar đã tạo. Bản đầu có chữ/nhân vật quá lớn so với vùng crop nên chưa dùng cuối.

## Banner — prompt chỉnh vùng an toàn đã chọn

Edit this banner for YouTube MOBILE SAFE AREA. Preserve the exact character face, indigo/amber style, and every Vietnamese letter: 'CHÚ TƯ RÀNH ĐỒ' and 'Hiểu món mình xài, quyết định cho đáng.' The current title/portrait are TOO LARGE for mobile crop. Make the entire critical portrait plus title/tagline grouping 35% SMALLER and center the grouping horizontally AND vertically. At 16:9 overall canvas, ALL text and the entire head/hair/glasses must fit INSIDE the central rectangle spanning x=22%..78% and y=37%..63%. It is essential: nothing important outside that central 56% width by 26% height. Use a smaller bust portrait next to compact title/tagline, similar logo arrangement. Make top 36% and bottom 36% largely empty matching warm cream. Keep appliance decorations only as quiet background near far left/right, do not enlarge them. No added text, no border, no guides, no mockup. Target final 2560x1440 YouTube banner. Do not crop off the portrait head or a single title accent. Exactly one finished banner.

Tham chiếu: banner đầu. Công cụ thực xuất1672×940; xuất kỹ thuật bằng FFmpeg: scale Lanczos2176×1224 rồi pad nền kem ở giữa canvas2560×1440. Đã xem lại toàn ảnh và crop giữa1540×422, tên/tagline/đầu nhân vật đủ. File cuối dưới6MB. Metadata/hash xem provenance.json.

Nguồn kích thước: https://support.google.com/youtube/answer/10456525?co=GENIE.Platform%3DDesktop&hl=en
